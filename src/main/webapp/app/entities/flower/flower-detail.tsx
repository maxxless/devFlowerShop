import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './flower.reducer';
import { IFlower } from 'app/shared/model/flower.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFlowerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FlowerDetail = (props: IFlowerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { flowerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Flower [<b>{flowerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">Name</span>
          </dt>
          <dd>{flowerEntity.name}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{flowerEntity.description}</dd>
          <dt>
            <span id="price">Price</span>
          </dt>
          <dd>{flowerEntity.price}</dd>
          <dt>
            <span id="image">Image</span>
          </dt>
          <dd>
            {flowerEntity.image ? (
              <div>
                <a onClick={openFile(flowerEntity.imageContentType, flowerEntity.image)}>
                  <img src={`data:${flowerEntity.imageContentType};base64,${flowerEntity.image}`} style={{ maxHeight: '30px' }} />
                </a>
                <span>
                  {flowerEntity.imageContentType}, {byteSize(flowerEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>Available Colours</dt>
          <dd>
            {flowerEntity.availableColours
              ? flowerEntity.availableColours.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {i === flowerEntity.availableColours.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/flower" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/flower/${flowerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ flower }: IRootState) => ({
  flowerEntity: flower.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FlowerDetail);
