export const template = `
<div class="d-flex flex-col justify-content-center align-items-center">
    <div onclick="document.getElementById('loadAvatarForm').style.display='flex'"
        class="avatar d-flex justify-content-center align-items-center">
        <p>Поменять </br> аватар</p>
    </div>
    <h3>{{name}}</h3>
</div>
<div style="display:none" id="loadAvatarForm" class="editAvatar">
<div class="form-load-file shadow rounded">
    <h3>Загрузите файл</h3>
    <form id="fileFrom">
        <label for="upload">
            <span class="text-success">Выбрать файл на компьюторе</span>
            <input type="file" id="upload" style="display:none">
        </label>
    </form>
    <button
        onclick="{consoleOutput(fileFrom); document.getElementById('loadAvatarForm').style.display = 'none'}"
        class="btn btn-success w-75">Поменять</button>
</div>
</div>
`