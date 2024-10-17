import { Application, Router } from "https://deno.land/x/oak/mod.ts";

// need to point api.timetomeet.ca to reverse proxy to localhost:8000

const meetings = new Map<string, any>();
meetings.set("1", { // meeting id,
  id: "1",
  title: "Meeting Name",
  date: "2021-07-01", // date in ISO format
  startTime: "9:00", // initial time used to calculate availability
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
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 8000 });