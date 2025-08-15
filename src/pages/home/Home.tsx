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

  // TODO: Add buttons to navigate to each page
  // TODO: Add page to read all journal entries for a profile
  // TODO: Add saving a journal entry with a profile to local storage

  return (
    <div className="home">
      <Banner text="Tarot Journal" />
    </div>
  );
}

export default Home;
