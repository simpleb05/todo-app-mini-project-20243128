import { useEffect, useState } from "react";
import axios from "axios";
import profileImg from "./assets/profile.png";

const API = "/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const getTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => {
    getTodos();
  }, []);

  const addTodo = async () => {
    if (!text.trim()) return;
    await axios.post(API, { title: text }); // ✅ 수정
    setText("");
    getTodos();
  };

  const toggleTodo = async (id, completed) => {
    await axios.put(`${API}/${id}`, { completed: !completed });
    getTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    getTodos();
  };

  const filteredTodos = todos.filter(todo =>
    todo.title.toLowerCase().includes(search.toLowerCase()) // ✅ 수정
  );

  return (
    <div style={styles.container}>
      <div style={styles.layout}>

        {/* 상단 */}
        <div style={styles.headerBox}>
          <h1 style={styles.title}>TODOLIST</h1>
          <p style={styles.date}>{new Date().toDateString()}</p>
        </div>

        {/* 프로필 */}
        <div style={styles.profileBox}>
          <img src={profileImg} style={styles.img} />

          <h3>Student ID</h3>
          <div style={styles.line}></div>

          <p style={styles.name}>Username</p>
          <p>📚 Computer Engineering</p>
          <p>🎓3rd grade</p>
          <p>🏫 Changwon National University</p>

          <div style={styles.stats}>
            <div>
              <b>{todos.length}</b>
              <p>Total</p>
            </div>
            <div>
              <b>{todos.filter(t => t.completed).length}</b>
              <p>Done</p>
            </div>
          </div>
        </div>

        {/* 검색 */}
        <div style={styles.searchBox}>
          <input
            style={styles.input}
            placeholder="목록 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* 추가 */}
        <div style={styles.addBox}>
          <input
            style={styles.input}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="오늘 할 일"
          />
          <button style={styles.addBtn} onClick={addTodo}>+</button>
        </div>

        {/* 리스트 */}
        <div style={styles.listBox}>
          {filteredTodos.map((todo) => (
            <div
              key={todo._id}
              style={{
                ...styles.todo,
                background: todo.completed ? "#e8f5e9" : "#fff",
              }}
            >
              <div style={styles.todoLeft}>
                ⭐
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                  }}
                >
                  {todo.title} {/* ✅ 수정 */}
                </span>
              </div>

              <div style={styles.todoRight}>
                <button
                  style={{
                    ...styles.check,
                    background: todo.completed ? "#2e7d32" : "#ccc",
                  }}
                  onClick={() =>
                    toggleTodo(todo._id, todo.completed)
                  }
                >
                  ✔
                </button>

                <button style={styles.del} onClick={() => deleteTodo(todo._id)}>
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#f5f5f5",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  layout: {
    width: "1100px",
    height: "700px",
    display: "grid",
    gridTemplateColumns: "300px 1fr",
    gridTemplateRows: "110px 70px 70px 1fr",
    gap: "15px",
  },

  headerBox: {
    gridColumn: "1 / 3",
    background: "#fff",
    border: "2px solid #ddd",
    borderRadius: "12px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: "42px",
    fontWeight: "900",
    letterSpacing: "2px",
    margin: 0,
  },

  date: {
    marginTop: "20px",
    fontSize: "16px",
    color: "#666",
  },

  profileBox: {
    gridRow: "2 / 5",
    background: "#dcd2ff",
    border: "2px solid #bbb",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
  },

  img: {
    width: "250px",
    borderRadius: "10px",
    marginBottom: "10px",
  },

  line: {
    height: "1px",
    background: "#999",
    margin: "10px 0",
  },

  name: {
    fontWeight: "bold",
    margin: "8px 0",
  },

  stats: {
    background:"#fff",
    display: "flex",
    justifyContent: "space-around",
    marginTop: "10px",
    fontSize: "20px",
  },

  searchBox: {
    background: "#fff",
    border: "2px solid #ddd",
    borderRadius: "12px",
    padding: "10px",
    display: "flex",
  },

  addBox: {
    display: "flex",
    gap: "10px",
    background: "#fff",
    border: "2px solid #ddd",
    borderRadius: "12px",
    padding: "10px",
  },

  input: {
    flex: 1,
    padding: "12px",
    fontSize: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  addBtn: {
    width: "45px",
    background: "black",
    color: "white",
    borderRadius: "8px",
  },

  listBox: {
    background: "#fff",
    border: "2px solid #ddd",
    borderRadius: "12px",
    padding: "15px",
    overflowY: "auto",
  },

  todo: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
  },

  todoLeft: {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  },

  todoRight: {
    display: "flex",
    gap: "10px",
  },

  check: {
    width: "30px",
    height: "30px",
    borderRadius: "6px",
    color: "white",
    border: "none",
  },

  del: {
    color: "red",
    border: "none",
    background: "none",
  },
};

export default App;