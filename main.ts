import { Application, Router } from "https://deno.land/x/oak/mod.ts"; // latest oak version

// need to point api.timetomeet.ca to reverse proxy to localhost:8000

type meeting = {
  title: string,
  startDate: string,
  startTime: string,
  participants: participant[],
}

type participant = {
  id: number,
  name: string,
  email?: string,
  password?: string, // optional only if a user opts in to edit their meeting times
}

const meetings = new Map<string, meeting>(); 
// eventually this will be a database, but for now it's just a map

meetings.set("1", { // reference to meeting
  title: "Meeting Name",
  startDate: new Date("2024-09-22").toISOString(), // don't know if I like this
  startTime: "9:00", // initial time used to calculate availability
  participants: [
    {id: 1, name: "John Test", email: "test@timetomeet.ca", password: "password"},
    {id: 2, name: "Jane Doe"},
  ],
});

meetings.set("2", {
  title: "Meeting 2",
  startDate: new Date("2024-09-23").toISOString(),
  startTime: "10:00",
  participants: [
    {id: 1, name: "Jakob Upton"},
    {id: 2, name: "George Costanza"},
  ],
});


const router = new Router();
router
  .get("/", (context) => { // api.timetomeet.ca/ returns a list of all meetings
    context.response.body = Array.from(meetings.values());
  })
  .get("/:id", (context) => { // api.timetomeet.ca/1 returns the meeting with id 1
    if (meetings.has(context?.params?.id)) {
      context.response.body = meetings.get(context.params.id);
    }
  })

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });