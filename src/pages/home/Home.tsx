import './Home.css';
import Banner from '../../components/Banner/Banner';

function Home() {
  // want:
  // title typography "Tarot Journal"
  // centered in the page
  // with a class of "home"
  // button to navigate to the tarot journal page
  // button to navigate to the tarot reading page
  // button to navigate to the tarot card meanings page
  return (
    <div className="home">
      <Banner text="Tarot Journal" />
    </div>
  );
}

export default Home;
