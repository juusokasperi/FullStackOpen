The team is coding this program using C.

For linting, we would use CppCheck. Some other options I found would be Splint or Clang-Tidy. The reason I chose CppCheck is that, from what I found through Google, it is quite easy to set up and it's also easy to use.

Testing would be good with Unity, it’s written in pure C and also has CMock support. Another pure C testing framework would be CUnit, but it has no mock support.

For building, the choices would be either Make or CMake. I'm already somewhat familiar with using Make and writing Makefiles, but I've understood that CMake might be the better option when integrating CI/CD to the project. For a smaller scale project, Make would be more straight-forward, but in my understanding CMake would be the better choice for long-term usage if the project grows more complex.

Some alternatives to Jenkins and GitHub Actions would include Azure Pipelines (part of Azure DevOps), which I understand is quite popular and widely used, GitLab CI/CD, CircleCI.

Since the team is quite small, we will definitely use a cloud-based environment for the setup. The reasons for this would be the easier setup and the fact that it will be cheaper. Factors to consider would be the size and complexity of the project and if there are any special requirements f.ex. testing. A self-hosted CI setup would make sense for example in companies where multiple teams and projects could take use of it.
