import PageHeader from "./Common/pageHeader";

const About = () => {
  return (
    //! fragment go straight under div's father and not create a extra div between tow components App & About/ Home
    <>
      <PageHeader
        title={
          <>
            About <br /> Dino <i className="bi bi-postcard-heart"></i> Business
            Cards
          </>
        }
        description=" Create a professional business card in minutes with our free business card maker. Dino's business card maker is easy to use and allows you full customization to get the design you want"
      />
    </>
  );
};

export default About;
