import { addNewTask , updateTask} from "./server";

(async function myTasks(){
    await addNewTask({
        name:"My task",
        id:"i2345"
    });

    await updateTask({
        id:"i2345",
        name:"My task - updated"
    })
})();
