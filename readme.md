# TimeToMeet API Server
This server powers the backend of the TimeToMeet website, a platform designed to simplify the process of scheduling and managing meetings.

## TODO

- **User Authentication**: Secure user registration and login.
- **Meeting Management**: Create, update, and delete meetings.
- **Participant Management**: Add and remove participants from meetings.
- **Notifications**: Send email notifications for meeting updates.

### Running the Server

Start the server with the following command:
```bash
deno run --allow-net main.ts
```

The server will be running on `http://0.0.0.0:8000`.

## API Endpoints

### Meetings

- `GET /`: Get all meetings.
- `POST /`: Create a new meeting.
- `PUT /:id`: Update a meeting.
- `DELETE /:id`: Delete a meeting.

### Participants

- `POST /:id/participants`: Add a participant to a meeting.
- `DELETE /:id/participants/:participantId`: Remove a participant from a meeting.