import React, { useEffect, useState } from 'react'
import data from "../../static.json";
import { FaArrowRight } from "react-icons/fa";
import axios from "axios";


const {bookables, day200, sessions} = data


function BookablesList() {
  const [bookableIndex, setBookableIndex] = useState(0);
  const [group, setGroup] = useState("Kit");
  const [hasDetails, setHasDetails] = useState(false);
  const [result, setResult] = useState([]);
  const [result2, setResult2] = useState([]);
  const [example, setExample] = useState("");

  console.log(example, "example");

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  const groups = [...new Set(bookables.map((b) => b.group))];

  const bookable = bookablesInGroup[bookableIndex];

  //? console.logs
  console.log({ groups, bookable, bookablesInGroup }, "groups");

  //!learning
  //  function changeBookable(selectedIndex) {
  //    bookableIndex = selectedIndex;
  //    console.log(selectedIndex);
  //  }

  const nextBookable = () => {
    setBookableIndex(
      (bookableIndex) => (bookableIndex + 1) % bookablesInGroup.length
    );
  };

  console.log(bookablesInGroup.length, "234");

  //! starts fetch state
  const fetchData = async () => {
    await axios
      .get(`https://api.ets.com.ng/mobile/fetch-state`)
      .then((res) => res.data)
      .then((values) => {
        console.log(values.data.states, "7777777777777777");
        // const data3 = data2.data;
        // console.log(data3.id, "cccccccccccccccccccccc")
        setResult2(values.data.states);
      });
  };

  const fetchCity = async()=>{
     await axios
       .get(`https://api.ets.com.ng/mobile/fetch-city/`)
       .then((res) => res.data)
       .then((values) => {
         console.log(values.data.states, "7777777777777777");
         // const data3 = data2.data;
         // console.log(data3.id, "cccccccccccccccccccccc")
         setResult2(values.data.states);
       });

  }

  //! car - type
  const fetchCarType = async () => {
    await axios
      .get(`https://api.ets.com.ng/mobile/get_vehicle_types`)
      .then((res) => res.data)
      .then((values) => {
        console.log(values.vehicle_types, "xxxxxxxxxxxx");
        // const data3 = data2.data;
        // console.log(data3.id, "cccccccccccccccccccccc")
        setResult2(values.vehicle_types);
      });
  };
  useEffect(() => {
    // fetchData();
    // fetchCarType();
    // submitDate()
  }, []);

  //? console for fetch state
  // const resultData = result.map((r) => {
  //   return {
  //     key: r.id,
  //     label: r.name,
  //   };
  // });

  const newResult2 = result2.map((v) => {
    return {
      label: v.name,
      value: v.id,
    };
  });
  console.log(newResult2, '980')

  //!end.

  // const newResult = {result.map((r)=>{})}
  // const groups = [...new Set(bookables.map((b) => b.group))];
  // const newResult = [...new Set(result.map((b) => b.name))];

  const submitDate = async(data)=>{
    const requestPayload = {
      pickup_city_id: 1,
      dropoff_city_id: 3,
      pick_up_state_id: 24,
      drop_off_state_id: 30,
      drop_off_address: "fsldfldf;d",
      pick_up_address: "ldldd;dl",
      user_id: 1,
    };
     await axios
       .post('http://api.ets.com.ng/mobile/book/interstate-trip', requestPayload)
       .then((res) => {
         console.log(res.data, "?????");
         const result = res.data
         setExample(result.data)
       })
       .catch((error)=>{
         console.log(error);
       });
  }
  

  // console.log(result.map((r)=>{
  //   console.log(r.name, 'see')
  // }));

  return (
    <>
      {/* <div>
        {result ? (
          <div>
            {result.map((r) => (
              <h1>{console.log(r, "xxxxxxx")}</h1>
            ))}
          </div>
        ) : (
          <div>
            loading ...
          </div>
        )}
      </div> */}
      <p>amount: {example?.data?.amount}</p>
      {/* <p>pickup city: {example.data.pickup_city}</p>
      <p>dropoff city: {example.data.dropoff_city}</p> */}
      <p>
        <button className="btn" type="submit" onClick={submitDate}>
          {" "}
          submit
        </button>
      </p>
      <div>
        <select value={group} onChange={(e) => setGroup(e.target.value)}>
          {groups.map((group) => (
            <option key={group}>{group}</option>
          ))}
        </select>
        <ul className="bookables items-list-nav">
          {bookablesInGroup.map((b, i) => (
            <li className={i === bookableIndex ? "selected" : null} key={b.id}>
              <button className="btn" onClick={() => setBookableIndex(i)}>
                {b.title}
              </button>
            </li>
          ))}
        </ul>
        <p>
          <button className="btn" onClick={nextBookable} autoFocus>
            <FaArrowRight />
            <span>Next</span>
          </button>
        </p>
      </div>

      {bookable && (
        <div className="bookable-details">
          <div className="item">
            <div className="item-header">
              <h1>{bookable.title}</h1>
              <span className="controls">
                <label>
                  <input
                    type="checkbox"
                    checked={hasDetails}
                    // onChange={() => setHasDetails((has) => !has)}
                    onChange={() => setHasDetails(!hasDetails)}
                  />
                  Show Details
                </label>
              </span>
            </div>
            <p>{bookable.notes}</p>
            {hasDetails && (
              <div className="item-details">
                <h3>Availability</h3>
                <div className="bookable-availability">
                  <ul>
                    {bookable.days.map((d) => (
                      <li key={d}>{day200[d]}</li>
                    ))}
                  </ul>
                  {bookable.sessions.map((s) => (
                    <li key={s}>{sessions[s]}</li>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default BookablesList

