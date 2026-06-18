import { PrismaClient } from '../src/generated/prisma';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Populando banco de dados...\n');

  const result = await prisma.$transaction(async (tx) => {
    // MASTER USER
    const masterUser = await tx.user.upsert({
      where: { email: 'eduardo@suabarbeariaapp.com' },
      update: {},
      create: {
        email: 'eduardo@suabarbeariaapp.com',
        name: 'Eduardo',
        password: bcrypt.hashSync('master123', 10),
        role: 'MASTER',
      },
    });
    console.log('Master:', masterUser.email);

    // TENANT 1: Barbearia Torres (baseado no mapeamento real)
    const torres = await tx.tenant.upsert({
      where: { slug: 'torres' },
      update: {},
      create: {
        name: 'Barbearia Torres',
        slug: 'torres',
        phone: '(31) 99876-5432',
        email: 'contato@barbeariatorres.com.br',
        colorPrimary: '#2A3235',
        colorAccent: '#D4A853',
        address: {
          rua: 'Av. do Contorno, 4521',
          bairro: 'Savassi',
          cidade: 'Belo Horizonte',
          estado: 'MG',
          cep: '30110-090',
        },
        openingHours: {
          seg: { open: '09:00', close: '21:00' },
          ter: { open: '09:00', close: '21:00' },
          qua: { open: '09:00', close: '21:00' },
          qui: { open: '09:00', close: '21:00' },
          sex: { open: '09:00', close: '21:00' },
          sab: { open: '09:00', close: '18:00' },
          dom: null,
        },
      },
    });

    const torresUser = await tx.user.upsert({
      where: { email: 'torres@barbearia.com' },
      update: {},
      create: {
        email: 'torres@barbearia.com',
        name: 'Carlos Torres',
        password: bcrypt.hashSync('tenant123', 10),
        role: 'TENANT',
        tenantId: torres.id,
      },
    });
    console.log('Tenant 1:', torres.name);

    const torresSavassi = await tx.unit.upsert({
      where: { tenantId_slug: { tenantId: torres.id, slug: 'savassi' } },
      update: {},
      create: {
        tenantId: torres.id, name: 'Savassi', slug: 'savassi',
        address: { rua: 'Av. do Contorno, 4521', bairro: 'Savassi', cidade: 'Belo Horizonte' },
        phone: '(31) 99876-5432',
      },
    });

    const torresBuritis = await tx.unit.upsert({
      where: { tenantId_slug: { tenantId: torres.id, slug: 'buritis' } },
      update: {},
      create: {
        tenantId: torres.id, name: 'Buritis', slug: 'buritis',
        address: { rua: 'Rua Professora Sandra Lucia, 200', bairro: 'Buritis', cidade: 'Belo Horizonte' },
        phone: '(31) 99876-1234',
      },
    });

    // Servicos Torres (mapeados do app OneApp)
    const torresServices = [
      { name: 'Corte Classico', category: 'HAIR' as const, description: 'Corte na tesoura com acabamento premium', price: 55, durationMin: 30, sortOrder: 1 },
      { name: 'Corte Maquina', category: 'HAIR' as const, description: 'Degrade, fade ou social na maquina', price: 40, durationMin: 25, sortOrder: 2 },
      { name: 'Corte Infantil', category: 'HAIR' as const, description: 'Para criancas ate 12 anos', price: 35, durationMin: 25, sortOrder: 3 },
      { name: 'Barba Express', category: 'BEARD' as const, description: 'Aparar e alinhar com maquina e navalha', price: 30, durationMin: 20, sortOrder: 4 },
      { name: 'Barboterapia', category: 'BEARD' as const, description: 'Toalha quente, oleo essencial, navalha e hidratacao', price: 65, durationMin: 45, sortOrder: 5 },
      { name: 'Barba Completa', category: 'BEARD' as const, description: 'Desenho completo com navalha e finalizacao', price: 45, durationMin: 30, sortOrder: 6 },
      { name: 'Corte + Barba', category: 'COMBO' as const, description: 'Corte classico + barba completa', price: 85, durationMin: 60, sortOrder: 7 },
      { name: 'Corte + Barboterapia', category: 'COMBO' as const, description: 'Corte classico + barboterapia premium', price: 110, durationMin: 75, sortOrder: 8 },
      { name: 'Sobrancelha', category: 'AESTHETICS' as const, description: 'Design de sobrancelha com pinca e navalha', price: 20, durationMin: 15, sortOrder: 9 },
      { name: 'Depilacao Nariz/Orelha', category: 'AESTHETICS' as const, description: 'Remocao com cera', price: 15, durationMin: 10, sortOrder: 10 },
      { name: 'Luzes / Mechas', category: 'CHEMISTRY' as const, description: 'Descoloracao parcial com tecnica de mechas', price: 120, durationMin: 90, sortOrder: 11 },
      { name: 'Camuflagem Fios Brancos', category: 'CHEMISTRY' as const, description: 'Coloracao sutil para disfarcar grisalhos', price: 80, durationMin: 45, sortOrder: 12 },
      { name: 'Hidratacao Capilar', category: 'TREATMENT' as const, description: 'Tratamento profundo com mascara reconstrutora', price: 50, durationMin: 30, sortOrder: 13 },
      { name: 'Selagem / Progressiva', category: 'TREATMENT' as const, description: 'Alisamento com selagem termica', price: 150, durationMin: 120, sortOrder: 14 },
    ];

    const services = [];
    for (const s of torresServices) {
      const svc = await tx.service.create({ data: { tenantId: torres.id, ...s } });
      services.push(svc);
    }
    console.log(services.length + ' servicos criados (Torres)');

    // Barbeiros Torres (5 profissionais)
    const schedFull = {
      seg: { open: '09:00', close: '21:00' }, ter: { open: '09:00', close: '21:00' },
      qua: { open: '09:00', close: '21:00' }, qui: { open: '09:00', close: '21:00' },
      sex: { open: '09:00', close: '21:00' }, sab: { open: '09:00', close: '18:00' },
    };
    const schedAfternoon = {
      seg: { open: '13:00', close: '21:00' }, ter: { open: '13:00', close: '21:00' },
      qua: { open: '13:00', close: '21:00' }, qui: { open: '13:00', close: '21:00' },
      sex: { open: '13:00', close: '21:00' }, sab: { open: '10:00', close: '18:00' },
    };
    const schedMorning = {
      seg: { open: '09:00', close: '17:00' }, ter: { open: '09:00', close: '17:00' },
      qua: { open: '09:00', close: '17:00' }, qui: { open: '09:00', close: '17:00' },
      sex: { open: '09:00', close: '17:00' }, sab: { open: '09:00', close: '14:00' },
    };

    const barbersData = [
      { name: 'Rafael Torres', nickname: 'Rafa', commissionPct: 50, schedule: schedFull, units: [torresSavassi, torresBuritis] },
      { name: 'Lucas Oliveira', nickname: 'Lukinha', commissionPct: 45, schedule: schedFull, units: [torresSavassi] },
      { name: 'Pedro Henrique', nickname: 'PH', commissionPct: 50, schedule: schedAfternoon, units: [torresSavassi] },
      { name: 'Thiago Souza', nickname: 'Thi', commissionPct: 45, schedule: schedMorning, units: [torresBuritis] },
      { name: 'Matheus Lima', nickname: 'Matt', commissionPct: 40, schedule: schedFull, units: [torresBuritis] },
    ];

    const barbers = [];
    for (const b of barbersData) {
      const barber = await tx.barber.create({
        data: { tenantId: torres.id, name: b.name, nickname: b.nickname, commissionPct: b.commissionPct },
      });
      for (const unit of b.units) {
        await tx.barberUnit.create({ data: { barberId: barber.id, unitId: unit.id, schedule: b.schedule } });
      }
      barbers.push(barber);
    }
    console.log(barbers.length + ' barbeiros criados');

    // Clientes de exemplo
    const clientesData = [
      { name: 'Joao Paulo Martins', phone: '31988001001' },
      { name: 'Andre Luiz Ferreira', phone: '31988002002' },
      { name: 'Gustavo Ribeiro', phone: '31988003003' },
      { name: 'Felipe Augusto', phone: '31988004004' },
      { name: 'Bruno Cesar', phone: '31988005005' },
      { name: 'Marcelo Dias', phone: '31988006006' },
      { name: 'Rodrigo Alves', phone: '31988007007' },
      { name: 'Daniel Nascimento', phone: '31988008008' },
      { name: 'Vinicius Costa', phone: '31988009009' },
      { name: 'Leonardo Prado', phone: '31988010010' },
      { name: 'Ricardo Teixeira', phone: '31988011011' },
      { name: 'Henrique Moura', phone: '31988012012' },
      { name: 'Carlos Eduardo', phone: '31988013013' },
      { name: 'Alexandre Nunes', phone: '31988014014' },
      { name: 'Fernando Gomes', phone: '31988015015' },
    ];

    const clients = [];
    for (const c of clientesData) {
      const client = await tx.client.create({ data: { tenantId: torres.id, name: c.name, phone: c.phone } });
      clients.push(client);
    }
    console.log(clients.length + ' clientes criados');

    // Agendamentos: hoje + passados (30 dias) + futuros (7 dias)
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const bookingsData: any[] = [];

    // HOJE
    const todaySlots = ['09:00','09:30','10:00','10:30','11:00','14:00','14:30','15:00','16:00','17:00'];
    for (let i = 0; i < todaySlots.length; i++) {
      const [h, m] = todaySlots[i].split(':').map(Number);
      const dateTime = new Date(today); dateTime.setHours(h, m, 0, 0);
      bookingsData.push({
        tenantId: torres.id, unitId: torresSavassi.id,
        barberId: barbers[i % barbers.length].id, serviceId: services[i % services.length].id,
        clientId: clients[i % clients.length].id, dateTime,
        durationMin: services[i % services.length].durationMin, price: services[i % services.length].price,
        status: i < 3 ? 'COMPLETED' : i < 8 ? 'CONFIRMED' : 'PENDING',
        origin: i % 3 === 0 ? 'INSTAGRAM' : i % 2 === 0 ? 'WHATSAPP' : 'APP',
      });
    }

    // PASSADOS (30 dias)
    for (let d = 1; d <= 30; d++) {
      const pastDate = new Date(today); pastDate.setDate(pastDate.getDate() - d);
      if (pastDate.getDay() === 0) continue;
      const slotsPerDay = 6 + Math.floor(Math.random() * 5);
      for (let s = 0; s < slotsPerDay; s++) {
        const hour = 9 + Math.floor(Math.random() * 10);
        const minute = Math.random() > 0.5 ? 30 : 0;
        const dateTime = new Date(pastDate); dateTime.setHours(hour, minute, 0, 0);
        bookingsData.push({
          tenantId: torres.id,
          unitId: Math.random() > 0.6 ? torresBuritis.id : torresSavassi.id,
          barberId: barbers[Math.floor(Math.random() * barbers.length)].id,
          serviceId: services[Math.floor(Math.random() * services.length)].id,
          clientId: clients[Math.floor(Math.random() * clients.length)].id,
          dateTime, durationMin: services[0].durationMin, price: services[Math.floor(Math.random() * services.length)].price,
          status: Math.random() > 0.1 ? 'COMPLETED' : 'NO_SHOW',
          origin: ['APP','WHATSAPP','WALK_IN','INSTAGRAM'][Math.floor(Math.random() * 4)],
        });
      }
    }

    // FUTUROS (7 dias)
    for (let d = 1; d <= 7; d++) {
      const futureDate = new Date(today); futureDate.setDate(futureDate.getDate() + d);
      if (futureDate.getDay() === 0) continue;
      const slotsPerDay = 3 + Math.floor(Math.random() * 4);
      for (let s = 0; s < slotsPerDay; s++) {
        const hour = 9 + Math.floor(Math.random() * 10);
        const dateTime = new Date(futureDate); dateTime.setHours(hour, Math.random() > 0.5 ? 30 : 0, 0, 0);
        bookingsData.push({
          tenantId: torres.id, unitId: torresSavassi.id,
          barberId: barbers[Math.floor(Math.random() * barbers.length)].id,
          serviceId: services[Math.floor(Math.random() * services.length)].id,
          clientId: clients[Math.floor(Math.random() * clients.length)].id,
          dateTime, durationMin: services[0].durationMin, price: services[Math.floor(Math.random() * services.length)].price,
          status: 'CONFIRMED', origin: 'APP',
        });
      }
    }

    for (const b of bookingsData) { await tx.booking.create({ data: b }); }
    console.log(bookingsData.length + ' agendamentos criados');

    // Atualizar metricas dos clientes
    for (const client of clients) {
      const count = await tx.booking.count({ where: { clientId: client.id, status: 'COMPLETED' } });
      const lastBooking = await tx.booking.findFirst({ where: { clientId: client.id, status: 'COMPLETED' }, orderBy: { dateTime: 'desc' } });
      await tx.client.update({ where: { id: client.id }, data: { totalVisits: count, lastVisit: lastBooking?.dateTime ?? null } });
    }
    console.log('Metricas de clientes atualizadas');

    // TENANT 2: Barbearia Elite (SP)
    const elite = await tx.tenant.upsert({
      where: { slug: 'elite' },
      update: {},
      create: {
        name: 'Barbearia Elite',
        slug: 'elite',
        phone: '(11) 98765-4321',
        email: 'contato@barbeariaelite.com.br',
        colorPrimary: '#1B1B1B',
        colorAccent: '#C9A96E',
        address: { rua: 'Rua Oscar Freire, 890', bairro: 'Jardins', cidade: 'Sao Paulo', estado: 'SP', cep: '01426-001' },
        openingHours: {
          seg: { open: '10:00', close: '20:00' }, ter: { open: '10:00', close: '20:00' },
          qua: { open: '10:00', close: '20:00' }, qui: { open: '10:00', close: '20:00' },
          sex: { open: '10:00', close: '20:00' }, sab: { open: '10:00', close: '17:00' }, dom: null,
        },
      },
    });
    const eliteUser = await tx.user.upsert({
      where: { email: 'elite@barbearia.com' },
      update: {},
      create: { email: 'elite@barbearia.com', name: 'Ricardo Almeida', password: bcrypt.hashSync('tenant123', 10), role: 'TENANT', tenantId: elite.id },
    });
    const eliteUnit = await tx.unit.upsert({
      where: { tenantId_slug: { tenantId: elite.id, slug: 'jardins' } },
      update: {},
      create: { tenantId: elite.id, name: 'Jardins', slug: 'jardins' },
    });
    const eliteServicesData = [
      { name: 'Corte Executivo', category: 'HAIR' as const, price: 80, durationMin: 40, sortOrder: 1 },
      { name: 'Degrade Premium', category: 'HAIR' as const, price: 70, durationMin: 35, sortOrder: 2 },
      { name: 'Barba Sculpt', category: 'BEARD' as const, price: 50, durationMin: 30, sortOrder: 3 },
      { name: 'Barboterapia Gold', category: 'BEARD' as const, price: 90, durationMin: 50, sortOrder: 4 },
      { name: 'Corte + Barba VIP', category: 'COMBO' as const, price: 120, durationMin: 70, sortOrder: 5 },
      { name: 'Pigmentacao Capilar', category: 'CHEMISTRY' as const, price: 200, durationMin: 90, sortOrder: 6 },
    ];
    for (const s of eliteServicesData) { await tx.service.create({ data: { tenantId: elite.id, ...s } }); }
    const eliteBarbersData = [
      { name: 'Diego Ramos', nickname: 'Di', commissionPct: 55 },
      { name: 'Fabio Mendonca', nickname: 'Fabio', commissionPct: 50 },
      { name: 'Anderson Silva', nickname: 'Andy', commissionPct: 50 },
    ];
    for (const b of eliteBarbersData) {
      const barber = await tx.barber.create({ data: { tenantId: elite.id, name: b.name, nickname: b.nickname, commissionPct: b.commissionPct } });
      await tx.barberUnit.create({ data: { barberId: barber.id, unitId: eliteUnit.id, schedule: schedFull } });
    }
    console.log('Tenant 2: Barbearia Elite (SP) criada');

    return { masterUser, tenants: [torres, elite], servicesCount: services.length + eliteServicesData.length, barbersCount: barbers.length + eliteBarbersData.length, clientsCount: clients.length, bookingsCount: bookingsData.length };
  }, { timeout: 120000 });

  console.log('\nSeed completo!\n');
  console.log('Resumo:');
  console.log('  Master:       ' + result.masterUser.email);
  console.log('  Tenants:      ' + result.tenants.map(t => t.name).join(', '));
  console.log('  Servicos:     ' + result.servicesCount);
  console.log('  Barbeiros:    ' + result.barbersCount);
  console.log('  Clientes:     ' + result.clientsCount);
  console.log('  Agendamentos: ' + result.bookingsCount);
  console.log('\nLogins:');
  console.log('  Master:  eduardo@suabarbeariaapp.com / master123');
  console.log('  Torres:  torres@barbearia.com / tenant123');
  console.log('  Elite:   elite@barbearia.com / tenant123');
}

main()
  .catch((e) => { console.error('Seed falhou:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
