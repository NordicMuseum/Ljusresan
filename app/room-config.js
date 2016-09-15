module.exports = [

    {
        name: "rum 1",
        description: "Startrummet, touch = börjar ny session",
        taskOrder: "any", // allAnyOrder, allInOrder, any
        taskIDs: [
            "room-1-task-1"
        ]
    },

    {
        name: "rum 2",
        description: "",
        taskOrder: "allAnyOrder",
        taskIDs: [
            "room-2-task-1",
            "room-2-task-2"
        ]
    },

    {
        name: "rum 3",
        description: "",
        taskOrder: "allAnyOrder",
        taskIDs: [
            "room-3-task-1",
            "room-3-task-2",
            "room-3-task-3"
        ]

    },

    {
        name: "rum 4",
        description: "",
        taskOrder: "allInOrder",
        taskIDs: [
            "room-3-task-1",
            "room-3-task-2",
            "room-3-task-3",
            "room-3-task-4"
        ]
    },

    {
        name: "rum 5",
        description: "ipad-rummet",
        taskOrder: "any",
        taskIDs: [
            "room-4-task-1"
        ]
    }

];
