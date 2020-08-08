import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';

const SearchForm = ({ startSearch, params, setParams }) => {
    const doSomething = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            startSearch()
        }
    }
    return (
        <div>
            <Form className="mb-4">
                <Form.Row className="align-items-end">
                    <Form.Group as={Col}>
                        <Form.Control
                            name="description" type="text"
                            value={params}
                            onChange={event => setParams(event.target.value)}
                            onKeyPress={(event) => doSomething(event)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} xs="auto">
                        <Button onClick={() => startSearch()}>Search</Button>
                    </Form.Group>
                </Form.Row>
            </Form>
        </div>
    );
};

export default SearchForm;