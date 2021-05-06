import TodoTable from "./Components/TodoTable";

function DashboardContent(props) {
  return (
    <props.Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 280,
      }}
    >
      <props.Switch>
        <props.Route exact path="/">
          <h1>dashborard</h1>
        </props.Route>
        <props.Route path="/todos">
          <TodoTable />
        </props.Route>
        <props.Route path="/settings">
          <h1>Settings</h1>
        </props.Route>
        <props.Route path="*">Dashboard</props.Route>
      </props.Switch>
    </props.Content>
  );
}
export default DashboardContent;
