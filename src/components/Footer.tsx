import React from 'react';
import { Grid, Text } from '@mantine/core';

class Footer extends React.Component<{}, {}> {
    // constructor(props: any) {
    //     super(props)
    // }

    render() {
        return (
            <div id='footer'>
                <Grid>
                    <Grid.Col sx={{ paddingTop: 40 }} xs={10} md={8} lg={6} xl={6} offsetXs={1} offsetMd={2} offsetLg={3} offsetXl={3}>
                        <Text align='center' size='sm'>
                            Friends of Legends isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.
                        </Text>
                    </Grid.Col>
                </Grid>
            </div>
        )
    }
}

export default Footer;