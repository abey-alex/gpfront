import React, {Component} from 'react';
import './Row.css';


class Row extends Component {
  state = {
    status: false,
    listed: false,
    name: '',
    address: '',
    phone: '',
    rating: '',
  };

  nodes = { name: null, address: null, phone: null, rating: null, update: null };
  toggleUpdate = false;
  old_values = null;

  componentWillMount = () => {
    const row = this.props.row;
    this.setState({
      status: row.status,
      listed: row.listed,
      name: row.name,
      address: row.address,
      phone: row.phone,
      rating: row.rating,
    });
    let {source, ...old_values} = this.props.row;
    this.old_values = old_values;

  };

  convertInt = (value) => {
    if (Number(value)) return parseInt(value, 10);
    return value;
  }

  onClickBool = (key) => {
    if (this.props.row.source === 'facebook'){
      this.setState({[key]: !this.state[key]});
    };
  };

  onChangeText = (event, key) => {
    const value = event.target.value
    const phoneno = /^\d{10}$/;
    const rating = /^([0-5])$/;
    if (value.match(phoneno)) this.setState({[key]: this.convertInt(value)});
    if (value.match(rating)) this.setState({[key]: this.convertInt(value)});
    else if (value && key !== 'phone' && key !== 'rating') this.setState({[key]: value});
    this.nodes[key].getElementsByTagName('input')[0].style.display = 'none';
    this.nodes[key].getElementsByTagName('span')[0].style.display = 'inherit';

  };

  handleKeyPress = (event, value) => {
    if (event.key === 'Enter') {
      this.onChangeText(event, value);
    }
  }

  onUpdate = (source) => {
    fetch(`http://localhost:5000/listing/${source}`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state)
    }).then( (response) => {
      this.old_values = this.state;
      this.toggleUpdate = false;
      this.setState({});
      console.log(response);
    });
  }

  render() {
    const {source} = this.props.row;
    const {name, address, phone, rating, listed, status} = this.state;
    let icon = source
    if (icon === 'google') icon = icon + '-plus';
    let sign = `fa fa-size fa-${status?'check':'times'}`;
    let listed_text = listed?'Yes':'No';

    const onColor = (key) => {
      return this.state[key] === this.old_values[key]?'':'change-color';
    }

    if (JSON.stringify(this.state, Object.keys(this.state).sort()) !== JSON.stringify(this.old_values, Object.keys(this.old_values).sort()))
      this.toggleUpdate = true;
    else this.toggleUpdate = false;

    const onClick = (value) => {
      if (source === 'facebook'){
        this.nodes[value].getElementsByTagName('span')[0].style.display = 'none';
        const input = this.nodes[value].getElementsByTagName('input')[0]
        input.style.display = 'inherit';
        input.focus();
        input.value = this.state[value];
      }
    };

  return (
    <tr>
      <td data-label=""><i className={`fa fa-size fa-${icon}`} aria-hidden="true"></i></td>
      <td data-label="Source">{source}</td>
      <td data-label="Name">
        <span onClick={() => onClick('name')} ref={(span) => {this.nodes.name=span}}>
          <span className={onColor('name')}>{name}</span>
          <input
            onKeyPress ={(event) => this.handleKeyPress(event, 'name')}
            onBlur={(event) => this.onChangeText(event, 'name')}
            className="displayNo"
            type="text"
          />
        </span>
      </td>
      <td data-label="Address">
        <span onClick={() => onClick('address')} ref={(span) => {this.nodes.address=span}}>
          <span className={onColor('address')}>{address}</span>
          <input
            onKeyPress ={(event) => this.handleKeyPress(event, 'address')}
            onBlur={(event) => this.onChangeText(event, 'address')}
            className="displayNo"
            type="text"
          />
        </span>
      </td>
      <td data-label="Phone">
        <span onClick={() => onClick('phone')} ref={(span) => {this.nodes.phone=span}}>
          <span className={onColor('phone')}>{phone}</span>
          <input
            maxLength="10"
            type="number"
            onKeyPress ={(event) => this.handleKeyPress(event, 'phone')}
            onBlur={(event) => this.onChangeText(event, 'phone')}
            className="displayNo"
          />
        </span>
      </td>
      <td data-label="Rating">
        <span onClick={() => onClick('rating')} ref={(span) => {this.nodes.rating=span}}>
          <span className={onColor('rating')}>{rating}/5</span>
          <input
            maxLength="1"
            min="0"
            max="5"
            type="number"
            onKeyPress ={(event) => this.handleKeyPress(event, 'rating')}
            onBlur={(event) => this.onChangeText(event, 'rating')}
            className="displayNo"
          />
        </span>
      </td>
      <td data-label="Listed">
        <span onClick={() => this.onClickBool('listed')} ref={(span) => {this.nodes.listed=span}}>
          <span className={onColor('listed')}>{listed_text}</span>
        </span>
      </td>
      <td data-label="Status"><i onClick={() => this.onClickBool('status')} className={sign} aria-hidden="true"></i></td>
      <td data-label="Update">
        <span ref={(span) => {this.nodes.update=span}}>
          {this.toggleUpdate ? (
            <button className="btn" onClick={() => this.onUpdate(this.props.row.source)}>Update</button>
          ) : (
            null
          )}
        </span>
      </td>
    </tr>
  );
};
}

export default Row;
