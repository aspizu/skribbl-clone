from typing import Any, cast
from dotenv import load_dotenv
import os

load_dotenv()
frontend = os.environ["FRONTEND"].removeprefix("http://").removeprefix("https://")
FRONTEND: tuple[str, int] = cast(Any, frontend.split(":"))
DEBUG: bool = os.getenv("DEBUG", "false") == "true"
