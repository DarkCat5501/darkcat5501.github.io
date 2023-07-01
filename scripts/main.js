function append(parent, ...elements){
    for(const element of elements){
        parent.appendChild(element)
    }
}

function toElement(data){
    const tmp = document.createElement('template')
    tmp.innerHTML = data
    return tmp.content.children
}

const components = {
    list: {
        body:(...items) => `<ul class="classic-menu">${items.join('')}</ul>`,
        item: (label, url) => `<li>
            <a href="${url}"> ${label} </a>
        </li>`,
        itemIcon: (label, url, icon) => `<li class="classic-menu-item">
            <i class="fa fa-${icon}"></i>
            <a href="${url}"> ${label} </a>
        </li>`,
    }
}

/**
 * @param {HTMLElement}
 **/
function initMenu(){
 
    //create menu from list
    const items = {
        home: ["home","#home"],
        about: ["newspaper-o","#about"]
    }

    const menu = toElement(components.list.body())[0];
    for(const [label,url] of Object.entries(items)){
        let menu_item;
        if(Array.isArray(url)) {
            const [icon,link] = url
            menu_item = toElement(components.list.itemIcon(label,link,icon))[0]
        } else {
            menu_item = toElement(components.list.item(label,url))[0]
        }

        menu_item.onclick = () => {
            for(const item of menu.children){
                item.classList.toggle('active',false)
            }
            menu_item.classList.toggle('active',true)
        }

        append(menu,menu_item)
    }


    append(this,menu)
}

const targetSubst = {
    "menu": initMenu
}

for(const [id,fn] of Object.entries(targetSubst)){
    const element = document.getElementById(id)
    if(element){ 
        fn.call(element)
    } else {
        console.error("Not found element:", id)
    }
}
