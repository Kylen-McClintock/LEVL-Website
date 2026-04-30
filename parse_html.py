from html.parser import HTMLParser

class MyHTMLParser(HTMLParser):
    def handle_data(self, data):
        if data.strip():
            print(data.strip())

parser = MyHTMLParser()
with open("levl.html", "r") as f:
    parser.feed(f.read())
