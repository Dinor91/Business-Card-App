import PageHeader from "./Common/pageHeader";

const Home = () => {
  return (
    //! fragment go straight under div's father and not create a extra div between tow components App & About/ Home
    <div>
      <PageHeader
        title={
          <>
            Home <br /> Dino <i className="bi bi-postcard-heart"></i> Business
            Cards
          </>
        }
        description="Ready to look professional and impressive? Pair your logo with striking business card designs you can print and share with anyone."
      />
    </div>
  );
};

export default Home;
