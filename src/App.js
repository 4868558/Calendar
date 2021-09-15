import "./styles.css";

// import Calendar from "./components/Calendar";
import Calendar from "./components/Calendar/index2";

export default function App() {
  let users = [
    {
      user: "Ivo",
      events: [
        {
          from: "20-09-2021",
          to: "22-09-2021"
        }
      ]
    },
    {
      user: "Pesho",
      events: [
        {
          from: "20-09-2021",
          to: "21-09-2021"
        }
      ]
    },
    {
      user: "Ivan",
      events: [
        {
          from: "21-09-2021",
          to: "22-09-2021"
        }
      ]
    },
    {
      user: "Ivan",
      events: [
        {
          from: "24-09-2021",
          to: "28-09-2021"
        }
      ]
    }
  ];

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Calendar users={users} />
    </div>
  );
}
