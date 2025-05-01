
# Angular Assignment: Posts App

This project was developed as part of a coding assignment to demonstrate Angular, NgRx SignalStore, testing, and best practices.

## 🚀 Tech stack

- **Angular 19**
- **NgRx SignalStore**
- **Angular Material (CDK)**
- **RxJS**
- **Jasmine/Karma** (unit testing)

## 🏗️ Project structure

Key layers:

- `PostsStore` → state management using NgRx SignalStore
- `PostsFacade` → exposes state + actions to components
- `PostGridComponent` → displays posts as a 10x10 grid
- `PostSquareComponent` → displays individual post
- `postsResolver` → fetches posts before navigation

---

## 🎯 Focus areas

We prioritized:

✅ Angular’s latest features (signals, standalone components)  
✅ Following official docs and recommendations  
✅ Simplicity over overengineering  
✅ Readability and maintainability of code and tests

? Also I tried to implement virtual scroll for the possibility of scalling, in case if we will have millions of posts but material CDK has limitation with column setup and I didn't want to waste more time figuring that out

---

## 🚀 To run the project

```bash
npm ci && npm run start
```

---

## 💯 Test coverage

Tests cover:

- State updates in `PostsStore`
- Facade delegation in `PostsFacade`
- Component logic in `PostGridComponent`
- Resolver behavior in `postsResolver`
- HTTP requests in `PostsService`

A coverage report can be generated via:

```bash
ng test --code-coverage
```

Coverage reports can be found in `/coverage/` folder after running.

---

## 🙏 Thank you

Thank you for reviewing this assignment!  
Feel free to reach out with questions or feedback.
