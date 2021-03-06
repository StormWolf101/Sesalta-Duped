class AnswerNotFoundError(Exception):
    def __init__(self, answer=None, options=[]):
        super()
        print(
            f"Could not find {'(' + answer + ')' if answer else ''} in options {options}")


class FormatNotFoundError(Exception):
    pass


class GameNotFoundError(Exception):
    def __init__(self, game=None, games=None):
        super()
        print(
            f"Could not find game {game if game else ''} in games {games.keys() if games else ''}")


class MaxQuestionsReached(Exception):
    pass


class ParameterNotFoundError(Exception):
    def __init__(self, param=None, args=None):
        super()
        print(
            f"Could not find parameter {'(' + param + ')' if param else ''} in parameters {args}")
