import { Blocks, Footer, Navbar, Transactions, TransferToken, Welcome } from "components";

const App = () => (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <Navbar />
      <Welcome />
      <Blocks />
      <TransferToken />
    </div>
    {/* <Services /> */}
    
    <Transactions />
    <Footer />
  </div>
);

export default App;
