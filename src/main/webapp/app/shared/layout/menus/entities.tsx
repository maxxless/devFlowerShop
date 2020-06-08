import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  <NavDropdown icon="th-list" name="Entities" id="entity-menu" style={{ maxHeight: '80vh', overflow: 'auto' }}>
    <MenuItem icon="asterisk" to="/collection">
      Collection
    </MenuItem>
    <MenuItem icon="asterisk" to="/category">
      Category
    </MenuItem>
    <MenuItem icon="asterisk" to="/cart">
      Cart
    </MenuItem>
    <MenuItem icon="asterisk" to="/colour">
      Colour
    </MenuItem>
    <MenuItem icon="asterisk" to="/flower">
      Flower
    </MenuItem>
    <MenuItem icon="asterisk" to="/order">
      Order
    </MenuItem>
    <MenuItem icon="asterisk" to="/delivery">
      Delivery
    </MenuItem>
    <MenuItem icon="asterisk" to="/client-card">
      Client Card
    </MenuItem>
    <MenuItem icon="asterisk" to="/packing">
      Packing
    </MenuItem>
    <MenuItem icon="asterisk" to="/flower-in-order">
      Flower In Order
    </MenuItem>
    <MenuItem icon="asterisk" to="/collection-in-order">
      Collection In Order
    </MenuItem>
    <MenuItem icon="asterisk" to="/flower-in-cart">
      Flower In Cart
    </MenuItem>
    <MenuItem icon="asterisk" to="/collection-in-cart">
      Collection In Cart
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
