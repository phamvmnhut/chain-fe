import { Footer, Navbar, Transactions, TransferToken, Welcome } from "components";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
      <TransferToken />
    </div>
    {/* <Services /> */}
    
    <Transactions />
    <Footer />
  </div>
);

export default App;
