import React from 'react';
import { Grid, Message, } from 'semantic-ui-react';

function footer () {

    return (
        <Grid style={styles}>
            <Grid.Row>
                <Grid.Column>
                    <Message>
                        <Message.Header>
                            Politica y Privacidad
                        </Message.Header>
                        <p>
                            Todos los datos serán tratados de forma anónima
                        </p>
                    </Message>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

const styles = { 
    marginTop: '10px'
}

export default footer;
