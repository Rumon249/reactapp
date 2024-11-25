import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);

    // State with "search" and "type" variables
    this.state = {
      search: "",
      type: "All" // Default type is set to "All"
    };
  }

  // Sets the state whenever the user types in the search bar
  onSearch = (event) => {
    this.setState({ search: event.target.value.trim().toLowerCase() });
  }

  // Sets the "type" state based on the selected filter option
  onFilter = (type) => {
    this.setState({ type });
  }

  // Filters items based on both "search" and "type" state variables
  filterItem = (item) => {
    const matchesSearch = item.name.toLowerCase().includes(this.state.search);
    const matchesType = this.state.type === "All" || item.type === this.state.type;
    return matchesSearch && matchesType;
  }

  render() {
    return (
      <div className="filter-list">
        {/* Dropdown Menu with Fruit, Vegetables, and All */}
        <DropdownButton id="dropdown-basic-button" title="Filter by Type">
          <Dropdown.Item onClick={() => this.onFilter("All")}>All</Dropdown.Item>
          <Dropdown.Item onClick={() => this.onFilter("Fruit")}>Fruit</Dropdown.Item>
          <Dropdown.Item onClick={() => this.onFilter("Vegetable")}>Vegetables</Dropdown.Item>
        </DropdownButton>

        <input
          type="text"
          placeholder="Search"
          onChange={this.onSearch}
        />

        {/* Render the filtered list */}
        <List items={this.props.items.filter(this.filterItem)} />
      </div>
    );
  }
}

export default FilteredList;
