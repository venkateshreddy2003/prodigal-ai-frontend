import axios from "axios";
import React, { useEffect, useState } from "react";
import image from "../../src/loading.gif";
const Table = () => {
  // let final = [];
  // let leng = 0;
  // const temp = () => {
  //   console.log(swaps);
  //   console.log(trans);
  //   console.log(pool);
  //   console.log(tokenzero);
  //   console.log(tokenone);
  //   let arr = [];
  //   for (let i = 0; i < leng; i += 1) {
  //     arr[i] = swaps[i];
  //     arr[i].transid = trans[i].childid;
  //     arr[i].poolid = pool[i].childid;
  //     arr[i].tokenzerosym = tokenzero.symbol;
  //     arr[i].tokenzeroid = tokenzero.childid;
  //     arr[i].tokenonesym = tokenone.symbol;
  //     arr[i].tokenoneid = tokenone.childid;
  //   }
  //   return arr;
  // };
  const [swaps, setSwaps] = useState([]);
  const [trans, setTrans] = useState([]);
  const [pool, setPool] = useState([]);
  const [tokenzero, setTokenZero] = useState([]);
  const [tokenone, setTokenOne] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const res1 = await axios.get("http://localhost:9000/get-swaps");
      const res2 = await axios.get("http://localhost:9000/get-trans");
      const res3 = await axios.get("http://localhost:9000/get-pool");
      const res4 = await axios.get("http://localhost:9000/get-tokenzero");
      const res5 = await axios.get("http://localhost:9000/get-tokenone");
      console.log(res1.data.length);
      console.log(res2.data.length);
      console.log(res3.data.length);
      console.log(res4.data.length);
      console.log(res5.data.length);
      setSwaps(res1.data);
      setTrans(res2.data);
      setPool(res3.data);
      setTokenZero(res4.data);
      setTokenOne(res5.data);
      setLoading(false);
    }
    fetchData();
  }, []);
  useEffect(() => {
    console.log(swaps);
    console.log(pool);
    console.log(trans);
    console.log(tokenzero);
    console.log(tokenone);
  }, [swaps, pool, trans, tokenone, tokenzero]);
  const handler = async () => {
    setLoading(true);
    await axios.put("http://localhost:9000/");
    setTimeout(async () => {
      const res1 = await axios.get("http://localhost:9000/get-swaps");
      const res2 = await axios.get("http://localhost:9000/get-trans");
      const res3 = await axios.get("http://localhost:9000/get-pool");
      const res4 = await axios.get("http://localhost:9000/get-tokenzero");
      const res5 = await axios.get("http://localhost:9000/get-tokenone");
      console.log(res1.data.length);
      console.log(res2.data.length);
      console.log(res3.data.length);
      console.log(res4.data.length);
      console.log(res5.data.length);
      setSwaps(res1.data);
      setTrans(res2.data);
      setPool(res3.data);
      setTokenZero(res4.data);
      setTokenOne(res5.data);
      setLoading(false);
    }, 50000);
  };
  return (
    <>
      {loading ? (
        <div>
          <img src={image} alt="please wait" />
        </div>
      ) : (
        <div>
          <div>
            <button onClick={handler}>update</button>
            <h3>click on update and please wait while loading the data</h3>
          </div>
          <table border={1}>
            <tr>
              <th>ID</th>
              <th>TIMESTAMP (UNIX)</th>
              <th>TRANSACTION ID</th>
              <th>POOL ID</th>
              <th>TOKEN 0 ID</th>
              <th>TOKEN 0 SYMBOL</th>
              <th>TOKEN 1 ID</th>
              <th>TOKEN 1 SYMBOL</th>
              <th>SENDER</th>
              <th>RECIPIENT</th>
              <th>ORIGIN</th>
              <th>AMOUNT 0</th>
              <th>AMOUNT 1</th>
              <th>AMOUNT USD</th>
              <th>SQRT PRICE X96</th>
              <th>TICK</th>
              <th>LOG INDEX</th>
            </tr>
            {swaps.map((item) => {
              return (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.time}</td>
                  <td>
                    {
                      trans.find((i) => {
                        return item.id === i.id;
                      }).childid
                    }
                  </td>
                  <td>
                    {
                      pool.find((i) => {
                        return item.id === i.id;
                      }).childid
                    }
                  </td>
                  <td>
                    {
                      tokenzero.find((i) => {
                        return item.id === i.id;
                      }).childid
                    }
                  </td>
                  <td>
                    {
                      tokenzero.find((i) => {
                        return item.id === i.id;
                      }).symbol
                    }
                  </td>
                  <td>
                    {
                      tokenone.find((i) => {
                        return item.id === i.id;
                      }).childid
                    }
                  </td>
                  <td>
                    {
                      tokenone.find((i) => {
                        return item.id === i.id;
                      }).symbol
                    }
                  </td>
                  <td>{item.sender}</td>
                  <td>{item.recipient}</td>
                  <td>{item.origin}</td>
                  <td>{item.amount0}</td>
                  <td>{item.amount1}</td>
                  <td>{item.amountusd}</td>
                  <td>{item.sqrtpricex96}</td>
                  <td>{item.tick}</td>
                  <td>{item.logindex}</td>
                </tr>
              );
            })}
          </table>
        </div>
      )}
    </>
  );
};

export default Table;
