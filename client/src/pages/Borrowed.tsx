// import Borrowings from '../components/borrowed/Borrowings';

import Borrowings from "../components/Borrowed/Borrowings";
import PageHeader from "../components/shared/PageHeader";

const Borrowed = () => {
  return (
    <>
      <PageHeader
        title="Borrowed Books"
        description="All Borrowed Book will be shown here"
      />
      <Borrowings />
    </>
  );
};

export default Borrowed;
