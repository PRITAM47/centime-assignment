import {useEffect, useState} from "react";
import {PieChart, Pie, Tooltip} from "recharts";
import {Trans, useTranslation} from "react-i18next";

const Dashboard = ({data, setData, name}) => {
  const [dataDetail, setDataDetail] = useState({name: "", amount: ""});
  // const [data, setData] = useState(apidata);
  const [total, setTotal] = useState(0);

  const [isError, setIsError] = useState({state: false, message: ""});

  const [isEdit, setIsEdit] = useState(false);
  const {t} = useTranslation();

  const handleAddData = (e) => {
    e.preventDefault();
    const amount = parseInt(dataDetail.amount, 10);
    if (isNaN(amount)) {
      setIsError({state: true, message: "Amount should be a valid number"});
      return;
    } else {
      setIsError({state: false, message: ""});

      const newDataDetail = {
        name: dataDetail.name,
        amount: Number(dataDetail.amount),
      };

      const newData = [...data, {id: Date.now(), ...newDataDetail}];
      setData(newData);
      setDataDetail({name: "", amount: ""});
      setIsEdit(false);
    }
  };

  useEffect(() => {
    setTotal(data.reduce((acc, element) => acc + Number(element.amount), 0));
  }, [data]);

  const handleDeleteData = (element) => {
    const filteredData = data.filter((ele) => ele.id !== element.id);
    setData(filteredData);
  };

  const handleEditData = (element) => {
    setIsEdit(true);
    const dataList = data.filter((ele) => ele.id !== element.id);
    setData(dataList);
    setDataDetail({name: element.name, amount: element.amount});
  };

  return (
    <>
      {isError.state ? (
        <div class='alert alert-danger' role='alert'>
          {t("dashboard.message")}
        </div>
      ) : null}

      <div className='container'>
        <h4>
          {name} (<Trans i18nKey='dashboard.total'>Total</Trans> : {total})
        </h4>
        {data.length > 0 ? (
          <PieChart width={400} height={400}>
            <Pie
              dataKey={"amount"}
              isAnimationActive={true}
              data={data}
              cx={200}
              cy={200}
              outerRadius={80}
              fill='#8884d8'
              label='Income'
            />
            <Tooltip />
          </PieChart>
        ) : null}
        <form>
          <div class='mb-3'>
            <label for='name' class='form-label'>
              {t("form.name")}
            </label>
            <input
              type='text'
              value={dataDetail.name}
              class='form-control'
              id='name'
              onChange={(e) => {
                setDataDetail({...dataDetail, [e.target.id]: e.target.value});
              }}
            />
          </div>
          <div class='mb-3'>
            <label for='amount' class='form-label'>
              {t("form.amount")}
            </label>
            <input
              type='text'
              value={dataDetail.amount}
              class='form-control'
              id='amount'
              onChange={(e) =>
                setDataDetail({...dataDetail, [e.target.id]: e.target.value})
              }
            />
          </div>

          <button type='submit' class='btn btn-primary' onClick={handleAddData}>
            {isEdit ? `${t("form.buttonUpdate")}` : `${t("form.buttonAdd")}`}
          </button>
        </form>

        <table class='table'>
          <thead>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>{t("table.name")}</th>
              <th scope='col'>{t("table.amount")}</th>
              <th scope='col'>{t("table.action")}</th>
            </tr>
          </thead>
          <tbody>
            {data.map((element, idx) => {
              return (
                <tr>
                  <th>{idx + 1}</th>
                  <td>{element.name}</td>
                  <td>{element.amount}</td>
                  <td>
                    <button
                      type='button'
                      class='btn btn-warning d-inline-block'
                      onClick={() => handleEditData(element)}
                    >
                      {t("table.button.edit")}
                    </button>

                    <button
                      type='button'
                      class='btn btn-danger d-inline-block mx-1'
                      onClick={() => handleDeleteData(element)}
                    >
                      {t("table.button.delete")}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Dashboard;
