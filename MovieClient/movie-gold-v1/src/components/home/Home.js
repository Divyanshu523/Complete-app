import Hero from '../hero/Hero';

const Home = ({movies}) => {
    
    console.log(movies);
    
    return (
        <Hero movies={movies} />
       
    );
}

export default Home;