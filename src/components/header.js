import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function header() {
    return (
        <Menu fluid widths={3} style={styles}>
            <Menu.Item>
                <Link to={`/`}>
                    <h3>
                        Explorar
                    </h3>
                </Link>
            </Menu.Item>

            <Menu.Item>
                <h1>
                    Invest UP
                </h1>
            </Menu.Item>

            <Menu.Item>
                <Link to={`/createCampaign`}>
                    <h3>
                        Crear Ronda
                    </h3>
                </Link>
            </Menu.Item>
        </Menu>
    )
};

const styles = { 
    marginTop: '5px'
}

export default header;