import React from 'react';
import { Redirect } from 'react-router-dom';
import { homeUrl, loginUrl } from './conf';
import { RouteComponentProps } from 'react-router';

const createRedirectComponent = (pathname: string, state?: object) => {
    return (props: any) => {
        return <Redirect to={{
            pathname,
            state
        }}
        />;
    };
};

export default (fn: () => Promise<any>) => {
    return class extends React.Component<RouteComponentProps> {
        _isMounted = true;

        state = {
            AsyncComponent: (props: RouteComponentProps) => <span>loading...</span>
        };

        async componentDidMount() {
            if (!this._isMounted) return;
            const { pathname } = window.location;
            if (pathname === loginUrl) {
                this.setState({
                    AsyncComponent: createRedirectComponent(homeUrl)
                });
                return;
            }
            const res = await fn();
            if (!this._isMounted) return;
            this.setState({
                AsyncComponent: res.default
            });
        }

        componentWillUnmount() {
            this._isMounted = false;
        }

        render() {
            const { AsyncComponent } = this.state;
            return <AsyncComponent {...this.props} />;
        }
    }
};