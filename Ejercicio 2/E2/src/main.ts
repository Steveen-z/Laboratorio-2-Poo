// 2. Simulador de Mercado Financiero
// Desarrollar un simulador de inversiones y mercado financiero. ✅
// Debe modelar diferentes tipos de activos (acciones, bonos, criptomonedas) con comportamientos y riesgos específicos. ✅
// El sistema simulará fluctuaciones de precios basadas en eventos económicos, ✅
// permitirá crear portfolios de inversión,  ✅ 
// ejecutar operaciones de compra/venta ✅
// y generar análisis de rendimiento y proyecciones a futuro.  ✅

// Puntos a Evaluar
// El programa debe realizar correctamente lo que se indicó en cada ejercicio. ✅
// Debe usar Typescript. ✅
// El usuario debe ser capaz de ingresar los datos en cada ejercicio. ✅
// El código debe cumplir con buenas prácticas y debe ser ordenado. ✅
// Debe tener validaciones y manejo de excepciones. ✅
// Debe aplicar los principios SOLID en cada ejercicio (mínimo 2 pueden ser cualquiera). ✅ [Single Responsibility & Open/Closed]
// Debe aplicar programación orientada a objetos para resolver los ejercicios. ✅
import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { Stock } from './models/Stock';
import { Bond } from './models/Bond';
import { Crypto } from './models/Crypto';
import { Portfolio } from './models/Portfolio';
import { MarketSimulator } from './services/MarketSimulator';
import { Analyzer } from './services/Analyzer';

const rl = readline.createInterface({ input, output });

const assets = [
    new Stock('Tesla', 230, 0.02),
    new Bond('US Treasury', 100, 0.01),
    new Crypto('Bitcoin', 77300, 0.05)
];

const portfolio = new Portfolio();
const market = new MarketSimulator(assets);

function askQuestion(query: string): Promise<string> {
    return new Promise(resolve => rl.question(query, resolve));
}

async function mainMenu() {
    let option: string;

    const validateNumber = async (message: string): Promise<number> => {
        while (true) {
            const input = await askQuestion(message);
            if (/^\d+$/.test(input)) return parseInt(input); // Verifica que sean solo números
            console.log("Ingrese un número válido (solo dígitos sin letras ni símbolos).");
        }
    };

    do {
        console.log('\n----------------------------------------');
        console.log('\n--- Simulador de Mercado Financiero ---');
        console.log('\n----------------------------------------');
        console.log('1. Ver activos disponibles');
        console.log('2. Simular mercado');
        console.log('3. Comprar activo');
        console.log('4. Vender activo');
        console.log('5. Ver portafolio');
        console.log('6. Proyección futura');
        console.log('7. Análisis de rendimiento');
        console.log('0. Salir');  

        option = await askQuestion("Ingrese una opción del menu: ")
        switch (option) {
            case '0':
                console.log("Saliendo del sistema");
                break;

            case '1':
                assets.forEach(asset => {
                    console.log(`${asset.name} - $${asset.price.toFixed(2)}`);
                });
                break;

            case '2':
                market.simulateMarket();
                console.log('Mercado simulado. Precios actualizados:');
                assets.forEach(asset => {
                    console.log(`${asset.name} - $${asset.price.toFixed(2)}`);
                });
                break;

            case '3':
                const asset_name_buy = await askQuestion("¿Nombre del activo a comprar?: ")
                const asset = assets.find(asset => asset.name.toLowerCase() === asset_name_buy.toLowerCase());
                if (!asset) {
                    console.error("Activo no encontrado.");
                    break;
                }
                const asset_quantity_buy = await validateNumber("¿Cantidad?: ")
                try {
                    portfolio.addAsset(asset, (asset_quantity_buy));
                    console.log('Compra realizada.');
                } catch (error: any) {
                    console.error(error.message);
                }
                break;

            case '4':
                const asset_name_sell = await askQuestion("¿Nombre del activo a vender?: ")
                const asset_quantity_sell = await validateNumber("¿Cantidad?: ")
                try {
                    portfolio.sellAsset(asset_name_sell, asset_quantity_sell);
                    console.log('Venta realizada.');
                } catch (error: any) {
                    console.error(error.message);
                }
                break;

            case '5':
                portfolio.listAssets();
                console.log(`Valor total: $${portfolio.getTotalValue().toFixed(2)}`);
                break;

            case '6':
                const asset_proyection_name = await askQuestion("¿Activo para proyectar?: ");
                const asset_proyection = assets.find(asset => asset.name.toLowerCase() === asset_proyection_name.toLowerCase());
                if (!asset_proyection) {
                    console.error("Activo no encontrado.");
                    break;
                }

                const asset_proyection_days = await validateNumber("¿Días?: ");
                const forecast = Analyzer.projectFutureValue(asset_proyection, asset_proyection_days);
                
                console.log(`Proyección de ${asset_proyection.name} en los próximos ${asset_proyection_days} días:`);
                
                let previousValue = forecast[0];
                forecast.forEach((value, index) => {
                    let change = 0;
                    let percentageChange = 0;
                    
                    if (index > 0) {
                        change = value - previousValue;
                        percentageChange = parseFloat(((change / previousValue) * 100).toFixed(2));
                    }
                    
                    const changeSymbol = change >= 0 ? '+' : ''; 
                    const percentage = index === 0 ? '' : ` -> ${changeSymbol}${percentageChange}%`;
                    
                    console.log(`Día ${index + 1} -> $${value.toFixed(2)} ${percentage}`);
                    
                    previousValue = value;
                });
                break;

            case '7':
                const asset_performance_name = await askQuestion("¿Nombre del activo?: ");
                const asset_performance = assets.find(asset => asset.name.toLowerCase() === asset_performance_name.toLowerCase());
                if (!asset_performance) {
                    console.error("Activo no encontrado.");
                    break;
                }

                const initialPrice = await validateNumber("¿Precio de compra?: ");
                const performance = Analyzer.calculatePerformance(asset_performance.price, initialPrice);
                console.log(`Rendimiento actual: ${performance}`);
                break;

            default:
                console.log("Opción incorrecta");
                break;
        }
    } while (option !== '0');
    rl.close();
}
mainMenu().catch(console.error);