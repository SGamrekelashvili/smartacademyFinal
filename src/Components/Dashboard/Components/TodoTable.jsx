import React, { useEffect } from "react";
import { Table, Tag, Radio, Space, Modal, Button } from "antd";
import { gql, useQuery, useMutation } from "@apollo/client";
const TodosQuery = gql`
  query todolists {
    todolists {
      id
      createdAt
      title
      complated
      published_at
    }
  }
`;

const TodoTable = (props) => {
  const todos = [];

  const { data, loading } = useQuery(TodosQuery, {
    fetchPolicy: "network-only",
  });

  const DeleteupdateCache = (cache, { data }) => {
    const existingTodos = cache.readQuery({
      query: TodosQuery,
    });
    const newTodo = existingTodos.todolists.filter(
      (t) => t.id !== data.deleteTodolist.todolist.id
    );
    console.log(data);
    cache.writeQuery({
      query: TodosQuery,
      data: { todolists: [newTodo] },
    });
  };
  const CreateupdateCache = (cache, { data }) => {
    const existingTodos = cache.readQuery({
      query: TodosQuery,
    });
    cache.writeQuery({
      query: TodosQuery,
      data: { todolists: [existingTodos] },
    });
  };

  const [Deletetodo] = useMutation(DeleteTodo, { update: DeleteupdateCache });
  const [CreateTodow] = useMutation(CreateTodo, { update: CreateupdateCache });

  const columns = [
    {
      title: "Task Name",
      dataIndex: "title",
    },
    {
      title: "Complected",
      dataIndex: "complated",
    },
    {
      title: "Created",
      dataIndex: "createdAt",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <button>Edit</button>
          <button
            onClick={() => deleteTodo({ key: record.key, Todo: Deletetodo })}
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];
  if (data) {
    data.todolists.forEach((element) => {
      todos.push({
        key: element.id,
        title: element.title,
        createdAt: element.createdAt
          .split("T")[0]
          .replace("-", "/")
          .replace("-", "/"),
        complated: `${element.complated}`,
      });
    });
  }

  const dd = {
    title: 1 + Math.random() * (120 - 1),
    complated: false,
  };

  return (
    <div>
      <Button onClick={() => CreateNewTodo({ dd: dd, Todo: CreateTodow })}>
        Add Todo
      </Button>
      <Table
        columns={columns}
        pagination={{ position: "bottomLeft" }}
        dataSource={todos}
        loading={loading}
      />
    </div>
  );
};

export default TodoTable;

const DeleteTodo = gql`
  mutation deleteTodolist($input: deleteTodolistInput) {
    deleteTodolist(input: $input) {
      todolist {
        id
      }
    }
  }
`;

const CreateTodo = gql`
  mutation createTodolist($input: createTodolistInput) {
    createTodolist(input: $input) {
      todolist {
        id
      }
    }
  }
`;
// mutation {
// 	createTodolist(input:{data:{title:"asda121asd12asdasd312asd23123131234asdasd12412421asdasd312sdd",complated:true}}){
//     todolist{
//       id
//     }
//   }
// }
function CreateNewTodo(props) {
  console.log(props.Todo);
  console.log(props.dd.title);
  console.log(props.dd.complated);
  const { createTodolist } = props.Todo({
    variables: {
      input: {
        data: {
          title: `${props.dd.title}`,
          complated: props.dd.complated,
        },
      },
    },
  });
}

function deleteTodo(props) {
  console.log(props);
  const { Deletetodolist } = props.Todo({
    variables: {
      input: {
        where: {
          id: props.key,
        },
      },
    },
  });
}
