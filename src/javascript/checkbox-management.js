const selectAllCheckboxes = (checkboxName) => {
    document.getElementsByName(checkboxName).forEach((checkbox) => {
        checkbox.checked = !checkbox.checked;
    });
}
