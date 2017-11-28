import React, { Component } from 'react';
import { connect } from 'dva';
import { List } from 'antd';
import styles from './Index.less';

@connect(state => ({
  event: state.event,
}))
export default class Event extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'event/fetch',
    });
  }

  render() {
    const { event: { list, loading } } = this.props;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: 50,
    };

    const ListContent = ({ data: { name, age, address } }) => (
      <div className={styles.listContent}>
        <div>{ name }</div>
        <div>{ age }</div>
        <div>{ address }</div>
      </div>
    );

    return (
      <div className={styles.event}>
        <List
          size="large"
          rowKey="id"
          loading={loading}
          pagination={paginationProps}
          dataSource={list}
          renderItem={item => (
            <List.Item>
              <ListContent data={item} />
            </List.Item>
          )}
        />
      </div>
    );
  }
}
