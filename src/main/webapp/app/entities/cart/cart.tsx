import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './cart.reducer';
import { ICart } from 'app/shared/model/cart.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { getAccountDetails, getAccountOrders, getAccountDeliveries } from 'app/shared/util/api';

export interface ICartProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const Cart = (props: ICartProps) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    props.getEntities();
    getAccountDetails();
    getAccountOrders();
    getAccountDeliveries();
  }, []);

  const startSearching = () => {
    if (search) {
      props.getSearchEntities(search);
    }
  };

  const clear = () => {
    setSearch('');
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  const { cartList, match, loading } = props;
  return (
    <div>
      <h2 id="cart-heading">
        Carts
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Cart
        </Link>
      </h2>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput type="text" name="search" value={search} onChange={handleSearch} placeholder="Search" />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      <div className="table-responsive">
        {cartList && cartList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Total Price Without Discount</th>
                <th>Card Discount</th>
                <th>Bonus Discount</th>
                <th>Final Price</th>
                <th>User</th>
                <th>Count</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cartList.map((cart, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${cart.id}`} color="link" size="sm">
                      {cart.id}
                    </Button>
                  </td>
                  <td>{cart.totalPriceWithoutDiscount}</td>
                  <td>{cart.cardDiscount}</td>
                  <td>{cart.bonusDiscount}</td>
                  <td>{cart.finalPrice}</td>
                  <td>{cart.count}</td>
                  <td>{cart.user ? cart.user.id : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${cart.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cart.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cart.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
            !loading && <div className="alert alert-warning">Your cart is empty</div>
          )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ cart }: IRootState) => ({
  cartList: cart.entities,
  loading: cart.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
