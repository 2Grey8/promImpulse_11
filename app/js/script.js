document.querySelectorAll('.tabs-triggers__item').forEach((item) =>
  item.addEventListener('click', function (e) {
    e.preventDefault();
    const id = e.target.getAttribute('href').replace('#', '');

    document.querySelectorAll('.tabs-triggers__item').forEach(
      (child) => child.classList.remove('tabs-triggers__item_active')
    );

    document.querySelectorAll('.tabs-content__item').forEach(
      (child) => child.classList.remove('tabs-content__item_active')
    );

    item.classList.add('tabs-triggers__item_active');
    document.getElementById(id).classList.add('tabs-content__item_active');
  })
);

document.querySelector('.tabs-triggers__item').click();

const btnPrev = document.querySelector('.tabs-button__prev');
const btnNext = document.querySelector('.tabs-button__next');

btnNext.addEventListener("click", function () {
  let current = document.querySelector(".tabs-triggers__item_active");
  (current.nextElementSibling || current.parentElement.children[0]).click();
});

btnPrev.addEventListener("click", function () {
  let current = document.querySelector(".tabs-triggers__item_active");
  (current.previousElementSibling || current.parentElement.children[current.parentElement.children.length - 1]).click();
});
