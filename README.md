## Development
Run both servers together:
```bash
docker compose up --build
```

Run front-end only:
```bash
docker compose up next-app --build
```

Run backend only:
```bash
docker compose up fast-server --build
```

Open [http://localhost:3000](http://localhost:3000) to access frontend.
Open [http://localhost:5000](http://localhost:5000) to access backend.


## Notes
The repo is devcontainer compatible, you can simply open it in github codespaces and run the docker commands from there.