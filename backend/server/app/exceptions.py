class ItemAlreadyExistException(Exception):
    status_code = 409
    def __init__(self, detail: str):
        self.detail = detail

class ItemNotFoundException(Exception):
    status_code = 404
    def __init__(self, detail: str):
        self.detail = detail

class AuthenticationException(Exception):
    status_code = 401
    def __init__(self, detail: str):
        self.detail = detail