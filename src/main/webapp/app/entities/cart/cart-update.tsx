import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './cart.reducer';
import { ICart } from 'app/shared/model/cart.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICartUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CartUpdate = (props: ICartUpdateProps) => {
  const [userId, setUserId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { cartEntity, users, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/cart');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...cartEntity,
        ...values
      };
      entity.user = users[values.user];

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="flowershopApp.cart.home.createOrEditLabel">Create or edit a Cart</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : cartEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="cart-id">ID</Label>
                  <AvInput id="cart-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="totalPriceWithoutDiscountLabel" for="cart-totalPriceWithoutDiscount">
                  Total Price Without Discount
                </Label>
                <AvField id="cart-totalPriceWithoutDiscount" type="string" className="form-control" name="totalPriceWithoutDiscount" />
              </AvGroup>
              <AvGroup>
                <Label id="cardDiscountLabel" for="cart-cardDiscount">
                  Card Discount
                </Label>
                <AvField id="cart-cardDiscount" type="string" className="form-control" name="cardDiscount" />
              </AvGroup>
              <AvGroup>
                <Label id="bonusDiscountLabel" for="cart-bonusDiscount">
                  Bonus Discount
                </Label>
                <AvField id="cart-bonusDiscount" type="string" className="form-control" name="bonusDiscount" />
              </AvGroup>
              <AvGroup>
                <Label id="finalPriceLabel" for="cart-finalPrice">
                  Final Price
                </Label>
                <AvField id="cart-finalPrice" type="string" className="form-control" name="finalPrice" />
              </AvGroup>
              <AvGroup>
                <Label for="cart-user">User</Label>
                <AvInput id="cart-user" type="select" className="form-control" name="user">
                  <option value="" key="0" />
                  {users
                    ? users.map((otherEntity, index) => (
                        <option value={index} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/cart" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  cartEntity: storeState.cart.entity,
  loading: storeState.cart.loading,
  updating: storeState.cart.updating,
  updateSuccess: storeState.cart.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CartUpdate);
