import { useMenuStore } from '../stores/menuStore';
import Header from '../components/Header';
import '../styles/Admin.css';

function Admin() {
  const menuItems = useMenuStore((state) => state.menuItems);
  const deleteMenu = useMenuStore((state) => state.deleteMenu);

  const handleDelete = async (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบเมนูนี้?')) {
      try {
        await deleteMenu(id);
        alert('ลบเมนูสำเร็จ!');
      } catch (error) {
        alert('เกิดข้อผิดพลาดในการลบเมนู');
      }
    }
  };

  return (
    <div className="admin-container">
      <Header />
      <div className="main-content">
        <aside className="sidebar">
          <h2>Welcome Employee!</h2>
          <button className="sidebar-btn">NEW MENU</button>
          <button className="sidebar-btn">EDIT MENU</button>
        </aside>
        <main className="menu-list">
          {menuItems.length === 0 ? (
            <p>ไม่มีเมนูอาหาร</p>
          ) : (
            <ul>
              {menuItems.map((item) => (
                <li key={item.id} className="menu-item">
                  <span>{item.name}</span>
                  <div className="menu-actions">
                    <button className="action-btn edit-btn">
                      <img src="/path-to-edit-icon.png" alt="Edit" />
                    </button>
                    <button
                      className="action-btn delete-btn"
                      onClick={() => handleDelete(item.id)}
                    >
                      <img src="/path-to-delete-icon.png" alt="Delete" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  );
}

export default Admin;
