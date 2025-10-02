import { HeroCarousel } from '../components/home/hero-corousel/hero-corousel';
import { ShowEvents } from '../components/home/ShowEvents';
// import { Collections } from '../components/home/collections';
// import { GetInTouch } from '../components/home/getInTouch';
// import { Welcome } from '../components/home/welcome';
// import { ProductShowcase } from '../components/home/product-showcase';
// import { Discover } from '../components/home/discover';

const Home = () => {
    return (
        <div className="flex flex-col">
            <HeroCarousel />
            
            {/* <Welcome /> */}

                {/* Full-width image section */}
                <ShowEvents />

            {/* <Collections />
            
            <ProductShowcase />
        
            <Discover/>

            <GetInTouch /> */}
        </div>
    );
};

export default Home

