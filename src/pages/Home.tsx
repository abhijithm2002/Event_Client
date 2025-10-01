
import { HeroCarousel } from '../components/home/hero-corousel/hero-corousel';
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
                <section className="w-full my-6">
                    <img
                        src="/machine.jpg"
                        alt="Machine"
                        className="w-full h-auto object-cover object-center"
                        style={{ maxHeight: '500px' }}
                    />
                </section>

            {/* <Collections />
            
            <ProductShowcase />
        
            <Discover/>

            <GetInTouch /> */}
        </div>
    );
};

export default Home

