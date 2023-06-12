import "./App.css";
import logo from "./utils/images/logo.jpg";
import Dashboard from "./components/Dashboard";
import {useEffect, useState} from "react";
import {useTranslation, Trans} from "react-i18next";

const data = {
  inflow: [
    {id: 1, name: "Salary", amount: 5000},
    {id: 2, name: "Freelancing", amount: 15000},
  ],
  outflow: [
    {id: 1, name: "Electric Bill", amount: 1000},
    {id: 2, name: "Mobile Bill", amount: 2000},
  ],
};

const lngs = {
  en: {nativeName: "English"},
  de: {nativeName: "Deutsch"},
};

function App() {
  const [inflow, setInflow] = useState(data.inflow);
  const [outflow, setOutflow] = useState(data.outflow);
  const [isMoreOutflow, setIsMoreOutflow] = useState(false);

  const {t, i18n} = useTranslation();
  useEffect(() => {
    const income = inflow.reduce(
      (acc, element) => acc + Number(element.amount),
      0
    );
    const expenditure = outflow.reduce(
      (acc, element) => acc + Number(element.amount),
      0
    );
    if (expenditure > income) {
      setIsMoreOutflow(true);
    } else {
      setIsMoreOutflow(false);
    }
  }, [inflow, outflow]);
  return (
    <div className='App'>
      <nav class='navbar bg-dark'>
        <div class='container'>
          <a class='navbar-brand' href='http://localhost:3000/'>
            <img src={logo} alt='logo' width='100%' height='100%' />
          </a>
        </div>
      </nav>
      <div className=' container-fluid mt-2'>
        <p style={{display: "inline-block"}}>
          <Trans i18nKey='description.choose'>Choose Your Language :</Trans>{" "}
        </p>
        {Object.keys(lngs).map((lng) => (
          <button
            key={lng}
            className={
              i18n.resolvedLanguage === lng
                ? "btn btn-success mx-2"
                : "btn btn-secondary mx-2"
            }
            type='submit'
            onClick={() => i18n.changeLanguage(lng)}
          >
            {lngs[lng].nativeName}
          </button>
        ))}
      </div>
      {isMoreOutflow ? (
        <div class='alert alert-danger' role='alert'>
          <Trans i18nKey='description.warning'>
            Spent Wisely - Your Expense is greater than Income
          </Trans>
        </div>
      ) : null}
      <div className='row container-fluid'>
        <div className='col-12 col-md-6 mt-3'>
          <Dashboard
            name={t("dashboard.income")}
            data={inflow}
            setData={setInflow}
          />
        </div>
        <div className='col-12 col-md-6 mt-3'>
          <Dashboard
            name={t("dashboard.expenditure")}
            data={outflow}
            setData={setOutflow}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
