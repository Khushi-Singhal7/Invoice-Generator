import Layout from "../../components/layout/Layout";
import Hero from "../../components/layout/Hero";
import Features from "../../components/layout/Features";
import Stats from "../../components/layout/Stats";
import Contact from "../../components/layout/Contact";

function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
      <Stats />
      <Contact />
    </Layout>
  );
}

export default Home;