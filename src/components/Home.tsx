import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component<{}, {}> {
    // constructor(props: any) {
    //     super(props)
    // }

    render() {
        return (
            <div className='columns'>
                <div className='column is-6 is-offset-3'>
                    <div className='block'></div>
                    <div className='box'>
                        <h1 className='title'>Friends of Legends</h1>
                        <p>
                            Stretch meoooow for scamper, where is my slave? I'm getting hungry for do i like standing on litter cuz i sits when i have spaces, my cat buddies have no litter i live in luxury cat life. Stare at ceiling light intrigued by the shower, and cat gets stuck in tree firefighters try to get cat down firefighters get stuck in tree cat eats firefighters' slippers for get poop stuck in paws jumping out of litter box and run around the house scream meowing and smearing hot cat mud all over. Play time cats woo, so avoid the new toy and just play with the box it came in but spot something
                        </p>
                        <div className='block'></div>
                        <div className='buttons is-grouped is-grouped-centered'>
                            <Link to='/register' className='button is-primary'>Sign Up</Link>
                            <Link to='/login' className='button is-light'>Log In</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;