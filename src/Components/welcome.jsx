import PageHeader from "./Common/pageHeader";

const Welcome = () => {
  return (
    <div>
      <PageHeader
        title={<>Welcome!</>}
        description="You are welcome to register as a business user or regular user. 
        Enjoy!"
      />
    </div>
  );
};

export default Welcome;
