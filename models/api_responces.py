from pydantic import BaseModel


class ErrorResponce(BaseModel):
    type: str
    title: str
    detail: str
